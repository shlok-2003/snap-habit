import { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "./button";
import { Cross } from "lucide-react";
import axios from "axios"; 
import { Session } from "next-auth";
import { RECOGNIZE_AND_MATCH_URL } from "@/lib/constants";

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
};

interface WebcamComponentProps {
    image: File | null;
    setImage: (image: File) => void;
    show: boolean;
    session: Session
    setShow: (show: boolean) => void;
    commitCaption: string,
    postId: string,
}

export default function WebcamComponent({
    image,
    setImage,
    show,
    setShow,
    session,
    commitCaption,
    postId,
}: WebcamComponentProps) {
    const ref = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const imageSrc = ref.current?.getScreenshot();
        if (imageSrc) {
            const byteString = atob(imageSrc.split(",")[1]);
            const mimeString = imageSrc
                .split(",")[0]
                .split(":")[1]
                .split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            const file = new File([blob], "image.jpg", { type: mimeString });
            console.log(file);
            setImage(file);
        }
    }, [ref, setImage]);

    const handleAPICall = async () => {
        if (!session) return;

        try {
            if (!image) return;
            const formData = new FormData();
            formData.append('clerkImageUrl', session.user?.image || '');
            formData.append('text', commitCaption);
            formData.append('image', image);
            formData.append('postId', postId);

            const response = await axios.post(`${RECOGNIZE_AND_MATCH_URL}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response);
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-5 flex bg-white border-black gap-2 border-2 flex-col items-center justify-center ${show ? "block" : "hidden"}`}
        >
            <Cross
                className="absolute top-2 right-2 h-6 w-6 text-black cursor-pointer"
                onClick={() => setShow(false)}
            />

            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={ref}
                screenshotFormat="image/jpeg"
                disablePictureInPicture
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />
            <Button
                onClick={async (e) => {
                    e.preventDefault();
                    capture();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    handleAPICall();
                }}
                className="bg-white text-black p-2 rounded-md border-black border-2"
            >
                Capture photo
            </Button>
        </section>
    );
}

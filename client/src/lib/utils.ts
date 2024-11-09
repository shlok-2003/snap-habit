import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const rupeeSymbol = "₹";

interface UrlQueryParams {
    params: string;
    key: string;
    value: string | null;
}
/**
 * Constructs a URL query by modifying the existing
 * query parameters with the specified key-value pair.
 *
 * @param as UrlQueryParams
 *
 * @returns {string} - A URL with the updated query parameters.
 */
export const formUrlQuery = ({ params, key, value }: UrlQueryParams): string => {
    const currentUrl = qs.parse(params);

    currentUrl[key] = value;

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true },
    );
};

interface RemoveUrlQueryParams {
    params: string;
    keysToRemove: string[];
}
/**
 * Constructs a URL query by modifying the existing query
 * parameters with the specified key-value pair.
 *
 * @param as RemoveUrlQueryParams
 *
 * @returns {string} - A URL with the updated query parameters.
 */
export const removeKeysFromQuery = ({
    params,
    keysToRemove,
}: RemoveUrlQueryParams): string => {
    const currentUrl = qs.parse(params);

    keysToRemove.forEach((key) => {
        delete currentUrl[key];
    });

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true },
    );
};
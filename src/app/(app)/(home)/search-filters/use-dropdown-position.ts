import { RefObject } from "react";

export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement | null>,
) => {
    const getDropdownPosition = () => {
        if (!ref.current) return { top: 0, left: 0 }
        const rect = ref.current.getBoundingClientRect()
        const dropdownWidth = 240
        // calculate initial position

        let left = rect.left + window.scrollX
        const top = rect.bottom + window.scrollY
        //check if dropdown woould go off the right edge of the viewport
        if (left + dropdownWidth > window.innerWidth) {
            left = rect.right + window.scrollX - dropdownWidth
        }

        //check if dropdown would go off the left edge of the viewport
        if (left < 0) {
            left = window.innerWidth - dropdownWidth - 16
        }

        //censure dropdown doesnt go off left edge
        if (left < 0) {
            left = 16
        }

        return { top, left }

    }

    return { getDropdownPosition }
}
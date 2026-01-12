export const createLayoutSlice = (set) => {
    return {
        mobileDrawerOpen: false,
        setMobileDrawerOpen: (value) => {
            set({ mobileDrawerOpen: value });
        },
    };
};

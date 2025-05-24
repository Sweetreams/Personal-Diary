export const theme =
{
    components: {
        Button: {
            defaultHoverBorderColor: localStorage.getItem("defaultHoverBorderColor") ? localStorage.getItem("defaultHoverBorderColor") : "var(--color-c7c7)",
            defaultHoverColor: localStorage.getItem("defaultHoverColor") ? localStorage.getItem("defaultHoverColor") : "var(--color-5959)",
            defaultBg: localStorage.getItem("defaultBg") ? localStorage.getItem("defaultBg") : "#ffffff",
            defaultActiveBg: localStorage.getItem("defaultActiveBg") ? localStorage.getItem("defaultActiveBg") : "#ffffff",
            defaultHoverBg: localStorage.getItem("defaultHoverBg") ? localStorage.getItem("defaultHoverBg") : "#ffffff",

            defaultColor: localStorage.getItem("defaultColor") ? localStorage.getItem("defaultColor") : "#333333",
            colorBorder: localStorage.getItem("colorBorder") ? localStorage.getItem("colorBorder") : "#d9d9d9",
            defaultActiveBorderColor: localStorage.getItem("defaultActiveBorderColor") ? localStorage.getItem("defaultActiveBorderColor") : "#0958d9",
            defaultActiveColor: localStorage.getItem("defaultActiveColor") ? localStorage.getItem("defaultActiveColor") : "#0958d9"
        },
        Layout: {
            headerPadding: "0 20px",
            bodyBg: localStorage.getItem("bodyBg") ? localStorage.getItem("bodyBg") : "#f8f8f8",
            siderBg: localStorage.getItem("siderBg") ? localStorage.getItem("siderBg") : "#ffffff",
            headerBg: localStorage.getItem("headerBg") ? localStorage.getItem("headerBg") : "#ffffff",
            triggerBg: "#ffffff"
        },
        Typography: {
            colorText: localStorage.getItem("colorText") ? localStorage.getItem("colorText") : "var(--color-3333)",
            colorLink: "var(--color-5959)",
            colorLinkHover: "var(--color-c7c7)",
            fontFamilyCode: "TT Commons"
        },
        Input: {
            colorBorder: "var(--color-5959)",
            hoverBorderColor: "var(--color-c7c7)",
            activeBorderColor: "var(--color-c7c7)"
        },
        Dropdown: {
            colorBgElevated: localStorage.getItem("siderBg") ? localStorage.getItem("siderBg") : "#ffffff",
            controlItemBgHover: localStorage.getItem("controlItemBgHover") ? localStorage.getItem("controlItemBgHover") : "rbga(0,0,0,0.04)"
        },
        Card: {
            bodyPadding: 20,
            borderRadiusLG: 20,
            colorBgContainer: localStorage.getItem("siderBg") ? localStorage.getItem("siderBg") : "#ffffff",
            colorBorderSecondary: localStorage.getItem("colorBorder") ? localStorage.getItem("colorBorder") : "#f0f0f0"
        }
    },
}
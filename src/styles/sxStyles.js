export const buttonStyle = {
    backgroundColor: '#1c106ac9',
    borderRadius: '20px',
    ':hover': {
        backgroundColor: '#a019c2'
    },
};

export const textfieldStyle = {
    // Root class for the input field
    "& .MuiOutlinedInput-root": {
        color: "white",
        fontFamily: "Roboto",
        backgroundColor: '#101e56a6 !important',
        width: '100%',
        minHeight: '60px',
        borderRadius: "20px",

        // Class for the border around the input field
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5e0b6a !important",
            borderWidth: "1px !important",
        },
    },

    "& .MuiInputBase-input": {
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        padding: '8px',
        lineHeight: '1.5',
    },

    // Material-UI InputLabel component
    "& .MuiInputLabel-outlined": {
        color: "white !important",
    },


};

export const modalStyle = {
    backgroundColor: '#00002c',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '768px',
    borderRadius: 5,
    border: '1px solid #003391',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto',
    boxSizing: 'border-box',

        // Additional multiline styles
        "& .MuiInputBase-inputMultiline": {
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            padding: '8px',
            lineHeight: '1.5',
        },


    
    
};

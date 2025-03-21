const Alert = ({ msg }) => {

    return (
        <div className="
            bg-red-500 text-white rounded-md 
            mt-6 text-sm py-3 pl-3 mb-4">
        <i className="fa-solid fa-triangle-exclamation"></i>  {msg}
        </div>
    ) 
};

export default Alert;
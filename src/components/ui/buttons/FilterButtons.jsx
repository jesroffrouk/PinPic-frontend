function Buttons({name,HandleClickEvent,isActive}) {
        return (
            <button
            onClick={() => HandleClickEvent()}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-small font-medium tracking-wide border transition-all duration-200
                ${
                isActive
                    ? "button_gradient text-secondary-text border-primary-border/60 button_shadow"
                    : "bg-blue-950/40 text-tertiary-text border-primary-border/40 hover:bg-blue-900/40 hover:text-blue-200 hover:border-blue-600/40"
                }`}
            >
            {name}
            </button>
        )
}

export default Buttons
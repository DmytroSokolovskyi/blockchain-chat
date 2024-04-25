import React, {useEffect, useRef, useState} from "react";

interface InputDropdownProps {
    containerStyle?: string;
    defaultValue?: string;
    options: number[];
    placeholder?: string;
    updateFormValue: (value: number) => void;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
                                                         containerStyle,
                                                         options,
                                                         placeholder,
                                                         updateFormValue,
                                                     }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<number>();

    const containerRef = useRef<HTMLDivElement>(null);

    const handleSelect = (value: number) => {
        setInputValue(value)
        setIsOpen(false);
        updateFormValue(value);
    };

    const handleInput = (value: number) => {
        setInputValue(value)
        updateFormValue(value);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = !inputValue ? options : options.filter((option) =>
        option.toString().includes(inputValue?.toString())
    );

    return (
        <div ref={containerRef} className={`form-control w-full ${containerStyle}`}>
            <div className="relative">
                <div
                    className="w-full input input-bordered h-10  bg-white cursor-pointer flex items-center justify-between"
                    onClick={handleToggle}
                >
                    <input
                        type="number"
                        placeholder={placeholder}
                        value={inputValue}
                        className="p-1 w-full bg-white text-black"
                        onChange={(e) => handleInput(+e.target.value)}
                    />
                    <div
                        style={{width: "15px", transform: "rotate(-150deg)"}}
                    >
                        <svg
                            id="blue_copy"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="Layer_4_copy">
                                <path
                                    className="fill-current"
                                    d="M31.356,25.677l38.625,22.3c1.557,0.899,1.557,3.147,0,4.046l-38.625,22.3c-1.557,0.899-3.504-0.225-3.504-2.023V27.7C27.852,25.902,29.798,24.778,31.356,25.677z"
                                />
                                <path
                                    className="fill-current"
                                    d="M69.981,47.977l-38.625-22.3c-0.233-0.134-0.474-0.21-0.716-0.259l37.341,21.559c1.557,0.899,1.557,3.147,0,4.046l-38.625,22.3c-0.349,0.201-0.716,0.288-1.078,0.301c0.656,0.938,1.961,1.343,3.078,0.699l38.625-22.3C71.538,51.124,71.538,48.876,69.981,47.977z"
                                />
                                <path
                                    className="stroke-current"
                                    d="M31.356,25.677l38.625,22.3c1.557,0.899,1.557,3.147,0,4.046l-38.625,22.3c-1.557,0.899-3.504-0.225-3.504-2.023V27.7C27.852,25.902,29.798,24.778,31.356,25.677z"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
                {isOpen && (
                    <div
                        className="absolute top-10 left-0 z-10 bg-white rounded-lg shadow-md w-full max-h-48 overflow-y-auto">

                        {filteredOptions?.map((one, index) => (
                            <div
                                key={index}
                                className={"p-2 cursor-pointer hover:bg-gray-light bg-white flex items-center"}
                                onClick={() => handleSelect(one)}
                            >
                                <span>{one}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputDropdown;

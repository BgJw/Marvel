function Spinner() {
    return (
           <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{margin: '0 auto', background: 'none', display: 'block'}}
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
        >
            <circle
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="#1d0e0b"
                strokeWidth="2"
            >
                <animate
                    attributeName="r"
                    begin="0s"
                    calcMode="spline"
                    dur="1.1363636363636365s"
                    keySplines="0 0.2 0.8 1"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    values="0;40"
                ></animate>
                <animate
                    attributeName="opacity"
                    begin="0s"
                    calcMode="spline"
                    dur="1.1363636363636365s"
                    keySplines="0.2 0 0.8 1"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    values="1;0"
                ></animate>
            </circle>
            <circle
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="#774023"
                strokeWidth="2"
            >
                <animate
                    attributeName="r"
                    begin="-0.5681818181818182s"
                    calcMode="spline"
                    dur="1.1363636363636365s"
                    keySplines="0 0.2 0.8 1"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    values="0;40"
                ></animate>
                <animate
                    attributeName="opacity"
                    begin="-0.5681818181818182s"
                    calcMode="spline"
                    dur="1.1363636363636365s"
                    keySplines="0.2 0 0.8 1"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    values="1;0"
                ></animate>
            </circle>
        </svg>
            );
}

export default Spinner;

// Define dev tool UI variables
document.addEventListener ("keydown", function (zEvent) {
	// Dev tools
    if (zEvent.ctrlKey  &&  zEvent.altKey  &&  zEvent.code === "KeyD") {
        initDevTools();
    }
} );

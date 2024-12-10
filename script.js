document.addEventListener("DOMContentLoaded", () => {
    const filterType = document.getElementById("filter-type");
    const frequencySlider = document.getElementById("frequency");
    const frequencyValue = document.getElementById("frequency-value");
    const couplingSlider = document.getElementById("coupling");
    const couplingValue = document.getElementById("coupling-value");
    const saveConfigButton = document.getElementById("save-config");
    const loadConfigButton = document.getElementById("load-config");
    const canvas = document.getElementById("responseChart");
    const ctx = canvas.getContext("2d");

    let filterConfig = {
        type: filterType.value,
        frequency: frequencySlider.value,
        coupling: couplingSlider.value
    };

    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        const freq = parseFloat(frequencySlider.value);
        const coupling = parseFloat(couplingSlider.value);
        
        for (let x = 0; x <= canvas.width; x++) {
            let y = Math.sin((x / canvas.width) * freq * Math.PI * 2) * coupling;
            ctx.lineTo(x, canvas.height / 2 - y * (canvas.height / 3));
        }

        ctx.strokeStyle = "#007bff";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function updateValues() {
        frequencyValue.textContent = `${frequencySlider.value} MHz`;
        couplingValue.textContent = couplingSlider.value;
        drawChart();
    }

    frequencySlider.addEventListener("input", updateValues);
    couplingSlider.addEventListener("input", updateValues);
    filterType.addEventListener("change", () => {
        filterConfig.type = filterType.value;
        drawChart();
    });

    saveConfigButton.addEventListener("click", () => {
        localStorage.setItem("filterConfig", JSON.stringify(filterConfig));
        alert("Configuration Saved!");
    });

    loadConfigButton.addEventListener("click", () => {
        const savedConfig = localStorage.getItem("filterConfig");
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            filterType.value = config.type;
            frequencySlider.value = config.frequency;
            couplingSlider.value = config.coupling;
            updateValues();
        } else {
            alert("No saved configuration found.");
        }
    });

    updateValues();
});

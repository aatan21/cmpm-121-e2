export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;

const totalCrew = 6;
let assignedSupplyCrew = 2;

type ShiftResults = {
  assignedSupplyCrew: number;
  totalCrew: number;
  supplyProduction: number;
  supplyConsumption: number;
  supplyBalance: number;
};

type SupplyDisplayRow = {
  label: string;
  value: number;
  color: string;
};

// Calculate supply production, consumption, and balance
function calculateSupplies(assignedCrew: number): ShiftResults {
  const supplyProduction = assignedCrew * 3;
  const supplyConsumption = totalCrew;
  const supplyBalance = supplyProduction - supplyConsumption;

  return {
    assignedSupplyCrew: assignedCrew,
    totalCrew,
    supplyProduction,
    supplyConsumption,
    supplyBalance,
  };
}

// Draw crew assignments and supply bars
function drawAllocation(results: ShiftResults) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < results.totalCrew; i++) {
    ctx.fillStyle = i < results.assignedSupplyCrew ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < results.assignedSupplyCrew ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(
    `Producers: ${results.assignedSupplyCrew} / ${results.totalCrew}`,
    18,
    76,
  );

  const displayRows: SupplyDisplayRow[] = [
    {
      label: "Production",
      value: results.supplyProduction,
      color: "#27766b",
    },
    {
      label: "Consumption",
      value: results.supplyConsumption,
      color: "#a44d23",
    },
  ];

  displayRows.forEach((row, index) => {
    const labelY = 102 + index * 52;
    const barY = labelY + 8;

    ctx.fillStyle = "#233e43";
    ctx.fillText(`${row.label}: ${row.value}`, 18, labelY);

    ctx.fillStyle = row.color;
    ctx.fillRect(18, barY, row.value * 14, 20);
  });
}

// Update the shift report
function updateReadout(results: ShiftResults) {
  readout.textContent =
    `Assigned: ${results.assignedSupplyCrew}/${results.totalCrew} · Production: ${results.supplyProduction} · Consumption: ${results.supplyConsumption} · Balance: ${
      results.supplyBalance > 0 ? "+" : ""
    }${results.supplyBalance}`;
}

function updateAllocation() {
  const results = calculateSupplies(assignedSupplyCrew);

  drawAllocation(results);
  updateReadout(results);
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  assignedSupplyCrew = Math.max(0, assignedSupplyCrew - 1);
  updateAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  assignedSupplyCrew = Math.min(6, assignedSupplyCrew + 1);
  updateAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    assignedSupplyCrew = 2;
    updateAllocation();
  };
updateAllocation();

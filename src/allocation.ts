export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;

const totalCrew = 6;
let assignedSupplyCrew = 2;

// Calculate supply production, consumption, and balance
function calculateSupplies() {
  const supplyProduction = assignedSupplyCrew * 3;
  const supplyConsumption = totalCrew;
  const supplyBalance = supplyProduction - supplyConsumption;

  return { supplyProduction, supplyConsumption, supplyBalance };
}

// Draw crew assignments and supply bars
function drawAllocation(
  supplyProduction: number,
  supplyConsumption: number,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < totalCrew; i++) {
    ctx.fillStyle = i < assignedSupplyCrew ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < assignedSupplyCrew ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${assignedSupplyCrew} / 6`, 18, 76);

  ctx.fillText(`Production: ${supplyProduction}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, supplyProduction * 14, 20);

  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${supplyConsumption}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, supplyConsumption * 14, 20);
}

// Update the shift report
function updateReadout(
  supplyProduction: number,
  supplyConsumption: number,
  supplyBalance: number,
) {
  readout.textContent =
    `Assigned: ${assignedSupplyCrew}/6 · Production: ${supplyProduction} · Consumption: ${supplyConsumption} · Balance: ${
      supplyBalance > 0 ? "+" : ""
    }${supplyBalance}`;
}

function updateAllocation() {
  const { supplyProduction, supplyConsumption, supplyBalance } =
    calculateSupplies();

  drawAllocation(supplyProduction, supplyConsumption);
  updateReadout(supplyProduction, supplyConsumption, supplyBalance);
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

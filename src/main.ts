const form = document.querySelector("form") as HTMLFormElement;

const clearBtn = document.querySelector(".clear") as HTMLButtonElement;
const calculateBtn = document.querySelector(".calc") as HTMLButtonElement;

const mortgageInput = document.getElementById(
  "mortgage_amount",
) as HTMLInputElement;
const termInput = document.getElementById("term") as HTMLInputElement;
const rateInput = document.getElementById("rate") as HTMLInputElement;

const monthlySum = document.getElementById("monthly_sum") as HTMLSpanElement;
const totalSum = document.getElementById("total_sum") as HTMLSpanElement;

const primaryChild = document.querySelector(".child") as HTMLDivElement;
const resultHtml = document.querySelector(".results") as HTMLDivElement;

interface MortgageInputs {
  mortgageAmount: number;
  mortgageTerm: number;
  mortgageRate: number;
  mortgageType: "repayment" | "interest";
}

const pounds = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function getFormData(): MortgageInputs | null {
  const mortgage = parseFloat(mortgageInput.value);
  const term = parseInt(termInput.value);
  const rate = parseFloat(rateInput.value);
  const type = (
    document.querySelector('[name="type"]:checked') as HTMLInputElement
  ).id;
  //   console.log(type);

  if (isNaN(mortgage) || isNaN(term) || isNaN(rate)) {
    return null;
  }

  const formData = {
    mortgageAmount: mortgage,
    mortgageTerm: term,
    mortgageRate: rate,
    mortgageType: type as "repayment" | "interest",
  };
  //   console.log(formData);

  return formData;
}

let monthlyPayment: number = 0;
let totalPayment: number = 0;

function calculateMortgage(e: Event) {
  e.preventDefault();

  const data = getFormData();
  console.log(data);

  if (!data) {
    return;
  }
  const { mortgageAmount, mortgageTerm, mortgageRate, mortgageType } = data;

  const monthlyRate = mortgageRate / 100 / 12;
  const totalNumPayments = mortgageTerm * 12;

  if (mortgageType === "repayment") {
    monthlyPayment =
      mortgageAmount *
      ((monthlyRate * (1 + monthlyRate) ** totalNumPayments) /
        ((1 + monthlyRate) ** totalNumPayments - 1));
  } else {
    monthlyPayment = (mortgageAmount * (mortgageRate / 100)) / 12;
  }
  totalPayment = monthlyPayment * totalNumPayments;



  primaryChild.classList.add("hidden");
  resultHtml.classList.remove("hidden");

  monthlySum.textContent = pounds.format(monthlyPayment)
  totalSum.textContent = pounds.format(totalPayment)

}

function clear() {
  form.reset()
  primaryChild.classList.remove("hidden");
  resultHtml.classList.add("hidden");
}

form.addEventListener("submit", calculateMortgage);
clearBtn.addEventListener("click", clear);

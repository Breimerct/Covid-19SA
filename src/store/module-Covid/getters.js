export function get_country_selected(state) {
  return state.country_Selected;
}

export function get_data_Covid(state) {
  return state.data_Covid;
}

export function get_char_Data(state) {
  return state.char_Data;
}

export const formatoMiles = ({
  state
}, Valor) => {
  let nums = new Array();
  let simb = ".";
  Valor = Valor.toString();
  Valor = Valor.replace(/\D/g, "");
  nums = Valor.split("");
  let long = nums.length - 1;
  let patron = 3;
  let prox = 2;
  let res = "";
  while (long > prox) {
    nums.splice(long - prox, 0, simb);
    prox += patron;
  }
  for (let i = 0; i <= nums.length - 1; i++) {
    res += nums[i];
  }
  return res;
}

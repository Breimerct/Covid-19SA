export function set_country_selected(state, payload) {
  state.country_Selected = payload;
}

export function set_Data_Covid(state, payload) {
  state.data_Covid = (payload);
}

export function set_Char_Data(state, payload) {
  state.char_Data = (payload);
}

export function set_Casos_Por_Dia(state, payload){
  state.casos_Por_Dia = (payload)
}

export function set_Muertes_Por_Dia(state, payload){
  state.Muertes_Por_Dia = (payload)
}

export function set_Recuperados_Por_Dia(state, payload){
  state.Recuperados_Por_Dia = (payload)
}

export const bootstrapInput = (text, placeholder, id, disabled = null) => {
  return `
      <div class="input-group">
        <span class="input-group-text">${text}</span>
        <input type="text" class="form-control" id="${id}" ${disabled} placeholder="${placeholder}" aria-label="NickName" aria-describedby="input_nickname">
      </div>
    `;
};

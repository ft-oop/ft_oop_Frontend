export const bootstrapInput = (text, placeholder, id, disabled = null) => {
  return `
      <div class="input-group text-center">
        <span class="input-group-text w-20">${text}</span>
        <input type="text" class="form-control" id="${id}" ${disabled} placeholder="${placeholder}" aria-label="NickName" aria-describedby="input_nickname">
      </div>
    `;
};

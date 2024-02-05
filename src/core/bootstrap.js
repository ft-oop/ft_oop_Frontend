export const bootstrapInput = (text, placeholder) => {
  return `
      <div class="input-group">
        <span class="input-group-text">${text}</span>
        <input type="text" class="form-control" placeholder="${placeholder}" aria-label="NickName" aria-describedby="input_nickname">
      </div>
    `;
};

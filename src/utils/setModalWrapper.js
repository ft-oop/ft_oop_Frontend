export function setModalWrapper($target) {
  $target.style.left = '0';
  $target.style.top = '0';
  $target.style.position = 'absolute';
  $target.style.width = '100%';
  $target.style.height = '100%';
  $target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
  $target.style.display = 'flex';
  $target.style.justifyContent = 'center';
  $target.style.alignItems = 'center';
  $target.style['backdrop-filter'] = 'blur(1.5px)';
}
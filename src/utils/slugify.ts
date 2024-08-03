export default function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Substitui espaços por -
    .replace(/[^\w\-]+/g, '') // Remove todos os caracteres não alfanuméricos
    .replace(/\-\-+/g, '-') // Substitui múltiplos - por um único -
    .replace(/^-+/, '') // Remove - do início
    .replace(/-+$/, ''); // Remove - do final
}

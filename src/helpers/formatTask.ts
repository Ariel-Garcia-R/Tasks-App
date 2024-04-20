export const formatTask = (taskBody: string) => {
  let formattedTaskBody = taskBody
  const mentionRegex = /\B(@[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9¡!¿?@]+)\b/g
  const hashtagRegex = /#[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9¡!¿?#_-]+/g

  if (mentionRegex.test(formattedTaskBody)) {
    formattedTaskBody = formattedTaskBody.replace(
      mentionRegex,
      '<span class="no-wrap pill contact-pill">$1</span>'
    )
  }

  if (hashtagRegex.test(formattedTaskBody)) {
    formattedTaskBody = formattedTaskBody.replace(
      hashtagRegex,
      '<span class="no-wrap pill hashtag-pill">$&</span>'
    )
  }

  return `<p class="items-center hover:text-opacity-15">${formattedTaskBody}</p>`
}

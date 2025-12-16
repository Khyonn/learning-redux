export default function salutation(salutation = "", action) {
  if (action.type === "dis bonjour") return "Bonjour";
  return salutation;
}
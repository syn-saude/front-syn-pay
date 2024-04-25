import TermoDeUsoTexto from "@/config/const/docs/TermoDeUsoTexto"

export default function TermosDeUsoTexto() {
  return (
    <div className="container max-w-screen-lg p-6 ">
      <div
        style={{
          fontSize: "2rem",
          overflow: "auto",
        }}
        dangerouslySetInnerHTML={{ __html: TermoDeUsoTexto }}
        data-cy="termoDeUso"
      ></div>
    </div>
  )
}

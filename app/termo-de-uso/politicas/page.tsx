import PoliticaPrivacidadeTexto from "@/config/const/docs/PoliticaPrivacidadeTexto"

export default function TermosDeUsoTexto() {
  return (
    <div className="container max-w-screen-lg p-6 ">
      <div
        style={{
          fontSize: "2rem",
          overflow: "auto",
        }}
        dangerouslySetInnerHTML={{ __html: PoliticaPrivacidadeTexto }}
        data-cy="politica"
      ></div>
    </div>
  )
}

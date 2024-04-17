export interface IStepsLabel {
  title: string
  subTitle: string
}

export interface IStepProps {
  steps: IStepsLabel[]
  currentStep: any
  qtdSteps: number
}

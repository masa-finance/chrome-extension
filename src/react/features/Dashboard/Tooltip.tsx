import { ReactNode } from "react"

type TooltipProps = {
  title: string,
  pointValue: string,
  description: string,
  body?: ReactNode,
}

export const Tooltip = ({
  title,
  pointValue,
  description,
  body = <></>,
}: TooltipProps) => {
  return (
    <section className="help-icon">
      <img
        src="icons/question-mark-in-circle.svg"
        width="19"
        height="19"
      />
      <aside className="tooltip">
        <header>
          <h5 className="tooltip-title">{title}</h5>          
          <div className='tooltip-points'>{pointValue}</div>
        </header>
        <p className="tooltip-description">{description}</p>
        <p className="tooltip-body">{body}</p>
      </aside>
    </section>
  )
}

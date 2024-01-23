export const PercentChange = ({value}: {value:number}) => {
  const style = value > 0 ? '--color-success' : '--color-error';
  const size = 20;

  return (
    <div className='percent-change'>
      { value > 0 && <img width={size} height={size} src="icons/arrow-up.svg" />}
      { value < 0 && <img width={size} height={size} src="icons/arrow-down.svg" /> }
      <span className='smaller-text' style={{color: `var(${style})`}}>{value}%</span>
    </div>
  )
}

import { days, months, years } from '../../helpers/dates';
import './SelectDateOfBirth.scss';
import Select, { SingleValue } from "react-select";

type SelectOption = {
  value: string | number | null,
  label: string | number
}
type Props = {
  onChange: (value: SingleValue<SelectOption>, param: string) => void,
}

export const SelectDateOfBirth: React.FC<Props> = ({ onChange }) => {

  const arrayDay: SelectOption[] = days.map((day) => ({ value: day, label: day }));

  const arrayMonth: SelectOption[] = months.map((month) => ({ value: month, label: month }));

  const arrayYear: SelectOption[] = years.map((year) => ({ value: year, label: year }));

  const selectOptionStyles = {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <div className='custom-select'>

      <div className="mt-2 is-normal pr-1 custom-font" style={{ width: '120px' }}>
        <Select
          options={arrayDay}
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              cursor: 'pointer',
              width: 150,
            }),
            option: () => (selectOptionStyles)
          }}
          menuPlacement="top"
          onChange={(event) => onChange(event, 'day')}
          placeholder="day"
          isSearchable={false}
        />
      </div>
      <div className="mt-2 is-normal pr-1 custom-font" style={{ width: '120px' }}>
        <Select
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              cursor: 'pointer',
              width: 150,
            }),
            option: () => (selectOptionStyles)
          }}
          menuPlacement="top"
          options={arrayMonth}
          onChange={(event) => onChange(event, 'month')}
          placeholder="month"
          isSearchable={false}
        />
      </div>
      <div className="mt-2 is-normal pr-1 custom-font" style={{ width: '120px' }}>
        <Select
          options={arrayYear}
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              cursor: 'pointer',
              width: 150,
            }),
            option: () => (selectOptionStyles)
          }}
          menuPlacement="top"
          onChange={(event) => onChange(event, 'year')}
          placeholder="year"
          isSearchable={false}
        />
      </div>
      <div>
      </div>
    </div>
  )
}
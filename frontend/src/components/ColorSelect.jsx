// Components
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CrossCircledIcon } from '@radix-ui/react-icons';

const ColorSelect = ({ color, setColor }) => {

    const colors = {
        white: '#FFFFFF',
        yellow: '#FAEDCB',
        green: '#C9E4DE',
        blue: '#C6DEF1',
        red: '#FFD2D2',
        gray: '#ECF0F1',
    }

    return (
        <div>
            <label className='form-label'>Color:</label>
            <ToggleGroup.Root type="single" className="ToggleGroup" defaultValue={color}>
                <ToggleGroup.Item
                    onFocus={() => setColor(colors.white)}
                    data-state={color === colors.white ? "on" : 'off'}
                    value={colors.white}
                    className="ToggleGroupItem white">
                    <CrossCircledIcon className='cross' />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    onFocus={() => setColor(colors.yellow)}
                    data-state={color === colors.yellow ? "on" : 'off'}
                    value={colors.yellow}
                    className="ToggleGroupItem yellow" />
                <ToggleGroup.Item
                    onFocus={() => setColor(colors.green)}
                    data-state={color === colors.green ? "on" : 'off'}
                    value={colors.green}
                    className="ToggleGroupItem green" />
                <ToggleGroup.Item
                    onFocus={() => setColor(colors.blue)}
                    data-state={color === colors.blue ? "on" : 'off'}
                    value={colors.blue}
                    className="ToggleGroupItem blue" />
                <ToggleGroup.Item
                    onFocus={() => setColor(colors.red)}
                    data-state={color === colors.red ? "on" : 'off'}
                    value={colors.red}
                    className="ToggleGroupItem red" />
                <ToggleGroup.Item
                    onFocus={() => setColor(colors.gray)}
                    data-state={color === colors.gray ? "on" : 'off'}
                    value={colors.gray}
                    className="ToggleGroupItem gray" />
            </ToggleGroup.Root>
        </div>
    )
}

export default ColorSelect
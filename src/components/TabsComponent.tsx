import { Tab, Tabs } from "@material-ui/core"
import { FC } from "react"

type TProps = {
    onChange: any
    value: string | number | null
    logout: () => void
}

const TabsComponent: FC<TProps> = ({onChange, value, logout}) => {
    return (
        <Tabs
            value={value}
            onChange={onChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Gallery" />
            <Tab label="Add Picture" />
            <Tab label="Log Out" onClick={logout} />
        </Tabs>
    )
}

export default TabsComponent
 
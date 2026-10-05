import {useCounterControls} from "../store.js";

const Buttons = () => {
    const {useGood, useBad, useNeutral, useAvg, usePositive} = useCounterControls()

    const handleGood = () => {
        useGood()
        useAvg()
        usePositive()
    }

    const handleBad = () => {
        useBad()
        useAvg()
        usePositive()
    }

    const handleNeutral = () => {
        useNeutral()
        useAvg()
        usePositive()
    }

    return (
        <div>
            <h2>give feedback</h2>
            <button onClick={handleGood}>good</button>
            <button onClick={handleNeutral}>neutral</button>
            <button onClick={handleBad}>bad</button>
        </div>
    )
}

export default Buttons

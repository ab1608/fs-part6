import {useValues} from "../store.js";

const Statistics = () => {
    const {good, neutral, bad, all, positive, average} = useValues()


    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                <tr>
                    <td>good</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutral</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>bad</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>all</td>
                    <td>{all}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{`${positive * 100} %`}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Statistics

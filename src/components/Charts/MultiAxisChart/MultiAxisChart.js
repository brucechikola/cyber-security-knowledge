import React, { useEffect } from 'react'
import RenderMultiAxisChart from './Function'

export default function MultiAxisChart(props) {
    const { data = [] } = props
    useEffect(() => {
        RenderMultiAxisChart({ data: data })
    }, [])
    return (
        <div id="multiAxisChart"></div>
    )
}

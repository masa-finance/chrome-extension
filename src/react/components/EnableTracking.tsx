import React, { useEffect, useState } from 'react'
import { updatePermission } from '../helpers/permissionUpdate'

export const EnableTracking = () => {

    const [checked, setChecked] = useState()

    useEffect(() => {
        fetchPermission()
    }, [])

    const fetchPermission = () => {
        chrome.storage.local.get(['trackingEnabled'], (result) => {
            setChecked(result.trackingEnabled || false);
        });
    }

    const handleChange = (event) => {
        updatePermission(event?.target.checked);
        fetchPermission();
    }
    
    return <div className="permission-toggle">
        <span>Enable Tasdasdasracking:</span>
        <label className="toggle-switch">
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <span className="slider round"></span>
        </label>
    </div>
}
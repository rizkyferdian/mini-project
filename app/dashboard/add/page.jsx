import AddCandidate from '@/app/components/addCandidate'
import SideBar from '@/app/components/sideBar'
import React from 'react'

export default function Add() {
    return (
        <>
            <div className='flex'>
                <SideBar />
                <AddCandidate />
            </div>
        </>
    )
}

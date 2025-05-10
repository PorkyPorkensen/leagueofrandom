import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'


export default function Header(){
    return (
    <div>
        <div className='headerDiv'>
            <Link className='siteHeader' to='/'>League of Random</Link>
            <div className='linkDiv'>
                <Link className='links' to='/'>Elo Demolisher</Link>
                <Link className='links' to='/cyc'>Choose Your Champ</Link>
            </div>
        </div>
    </div>

    )
}
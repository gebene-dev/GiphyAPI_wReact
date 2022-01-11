import React from 'react'

export default function Gif({title, url}) {
    return (
        <>
            <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                    <img className="card-img-top" src={url} alt="" />
                    <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

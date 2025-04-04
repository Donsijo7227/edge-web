// /components/NextBreadcrumb.tsx
// Source: "Creating a Breadcrumb Component in a Next.js App Router" by Kristian Cabading
// URL: https://medium.com/@kcabading/creating-a-breadcrumb-component-in-a-next-js-app-router-a0ea24cdb91a
// Author: Kristian Cabading
'use client'

import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const NextBreadcrumb = ({homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks}: TBreadCrumbProps) => {

    const paths = usePathname()
    // Return early if paths is null
    if (!paths) return null
    
    const pathNames = paths.split('/').filter( path => path )
    
    // Check if we're on a detail page where we should hide the slug
    // This now includes recognition/[slug], projects/[slug], and gallery/[slug]
    const isDetailPage = pathNames.length > 1 && 
        (pathNames[0] === 'recognition' || pathNames[0] === 'projects' || pathNames[0] === 'gallery')
    
    // For detail pages, only show section name (recognition or projects) and hide the slug
    const displayPaths = isDetailPage 
        ? pathNames.slice(0, 1) // Only show first segment and hide the slug
        : pathNames

    return (
        <div>
            <ul className={containerClasses}>
                <li className={listClasses}><Link href={'/'}>{homeElement}</Link></li>
                {displayPaths.length > 0 && separator}
            {
                displayPaths.map( (link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`
                    
                    // If we're on a detail page and this is the section item,
                    // make it active since we're hiding the actual active item (the slug)
                    const isActive = isDetailPage 
                        ? (link === 'recognition' || link === 'projects' || link === 'gallery')
                        : paths === href
                    
                    let itemClasses = isActive ? `${listClasses} ${activeClasses}` : listClasses
                    let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                    
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses} >
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {displayPaths.length !== index + 1 && separator}
                        </React.Fragment>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default NextBreadcrumb
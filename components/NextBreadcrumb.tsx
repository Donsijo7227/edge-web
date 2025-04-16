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
    
    const pathNames = paths.split('/').filter(path => path)
    
    // Debug information
    console.log('Current path:', paths)
    console.log('Path segments:', pathNames)
    
    return (
        <div>
            <ul className={containerClasses}>
                {/* Home link */}
                <li className={pathNames.length === 0 ? `${listClasses} ${activeClasses || 'font-bold'}` : listClasses}>
                    <Link href={'/'}>{homeElement}</Link>
                </li>
                
                {/* Only show separator if we have path items */}
                {pathNames.length > 0 && separator}
                
                {/* Map through all path segments */}
                {pathNames.map((link, index) => {
                    // Build the href for this breadcrumb item
                    const href = `/${pathNames.slice(0, index + 1).join('/')}`
                    
                    // This item is active if it's the last item in the path
                    const isActive = index === pathNames.length - 1
                    
                    // Apply active classes if this is the active item
                    // If no activeClasses provided, default to font-bold
                    const itemClasses = isActive 
                        ? `${listClasses} ${activeClasses || 'font-bold'}`
                        : listClasses
                    
                    console.log(`Item ${index}: "${link}" - isActive: ${isActive} - classes: ${itemClasses}`)
                    
                    // Format the link text
                    let itemLink = link.replace(/-/g, ' ')
                    if (capitalizeLinks) {
                        itemLink = itemLink
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                    }
                    
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses}>
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {/* Add separator if this isn't the last item */}
                            {index < pathNames.length - 1 && separator}
                        </React.Fragment>
                    )
                })}
            </ul>
        </div>
    )
}

export default NextBreadcrumb
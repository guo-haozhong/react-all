import React from 'react'
import LifeCycle from './LifeCycle';
import RouterContext from './RouterContext'

export default function Prompt({ message, when = true }) {
    return (
        <RouterContext.Consumer>
            {context => {
                if (!when) {
                    return null
                }
                let method = context.history.block;

                return (
                    <LifeCycle
                        onMount={(self) => {
                            self.release = method(message)
                        }}
                        onUnmount={(self) => {
                            self.release()
                        }}
                    />
                );
            }}
        </RouterContext.Consumer>
    )
}

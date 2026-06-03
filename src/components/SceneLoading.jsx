import React from 'react'

export default function SceneLoading({ height = 'full' }) {
  return (
    <div className={`flex items-center justify-center w-full ${height === 'full' ? 'h-full' : `h-${height}`}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border border-gold/30 animate-spin"
          style={{
            borderTopColor: 'transparent',
            borderRightColor: '#E5E4E2',
            borderBottomColor: 'transparent',
          }}
        />
        <span className="label-sm text-gold/40 animate-pulse">Loading</span>
      </div>
    </div>
  )
}

import React from 'react'

export default function SceneLoading({ height = 'full' }) {
  return (
    <div className={`flex items-center justify-center w-full ${height === 'full' ? 'h-full' : `h-${height}`}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border border-gold/30 animate-spin"
          style={{
            borderTopColor: 'transparent',
            borderRightColor: '#D4AF37',
            borderBottomColor: 'transparent',
          }}
        />
        <span className="font-body text-[10px] text-gold/40 uppercase tracking-widest animate-pulse">Loading</span>
      </div>
    </div>
  )
}

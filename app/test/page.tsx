export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '2rem',
        color: '#00E5FF'
      }}>
        LECO Test Page
      </h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#8B00FF', marginBottom: '1rem' }}>Inline Styles Test</h2>
        <p>If you can see this with proper colors and styling, the issue is with CSS loading.</p>
      </div>

      <div style={{ 
        backgroundColor: '#1A1A1A', 
        padding: '1rem', 
        borderRadius: '8px',
        border: '2px solid #00E5FF'
      }}>
        <h3 style={{ color: '#FF6B00' }}>Styled Container</h3>
        <p>This container should have a dark gray background with a blue border.</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a 
          href="/" 
          style={{ 
            color: '#00E5FF', 
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            border: '1px solid #00E5FF',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}

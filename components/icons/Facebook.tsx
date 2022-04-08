const Facebook = ({ ...props }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        padding: '0.4em 1.5em',
        backgroundColor: 'transparent',
        ...props.style,
      }}
    >
      <svg
        width={props.width || '1.25em'}
        height={props.height || '1.25em'}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // {...props}
      >
        <path
          d="M47.0871 192.044L46.8361 338.122L110.546 338.124L110.797 192.046H161.25C165.787 192.046 169.608 188.651 170.142 184.145L175.723 137.058C176.355 131.732 172.194 127.049 166.831 127.049H110.546V87.66C110.546 69.797 115.506 57.625 141.121 57.625L164.84 57.614C169.783 57.611 173.79 53.603 173.79 48.659V8.955C173.79 4.009 169.78 0 164.835 0H126.185C79.084 0 46.8371 28.75 46.8371 81.55V127.048H8.95507C3.99607 127.048 -0.0189328 131.078 6.71574e-05 136.037L0.182059 183.124C0.201059 188.056 4.20407 192.044 9.13607 192.044H47.0871Z"
          fill={props.fill || '#475993'}
        />
      </svg>
    </div>
  )
}

export default Facebook

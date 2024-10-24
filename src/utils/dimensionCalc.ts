interface Dimensions {
  height: number
  width: number
  device: 'mobile' | 'tablet' | 'desktop'
}

export const calculateDimensions = ({
  device,
  height,
  width,
}: Dimensions): Dimensions => {
  const ratio = 5 / 7

  let dimensions = { height: 0, width: 0, device }

  // Maintains current behavior for desktop
  const maxHeight = height
  const maxWidth = maxHeight * ratio

  if (maxWidth > width) {
    const newWidth = width
    const newHeight = newWidth / ratio
    dimensions = { height: newHeight, width: newWidth, device }
  } else {
    dimensions = { height: maxHeight, width: maxWidth, device }
  }

  console.log({
    entry: { device, height, width },
    dimensions,
  })

  return dimensions
}

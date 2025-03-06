const getVerticalScrollPercentage = (elm: HTMLElement): number => {
  const p = elm.parentNode as HTMLElement;
  if (!p) return 0; // Handle cases where there is no parent element
  if (p.scrollHeight == p.clientHeight) return 0 // happens when the page hasn't rendered yet so it may be very short

  const result = ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)).toFixed(3)

  return parseFloat(result);
};

export default getVerticalScrollPercentage;


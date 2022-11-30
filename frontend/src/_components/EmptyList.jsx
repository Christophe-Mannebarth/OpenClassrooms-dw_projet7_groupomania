import EmptyImage from '../assets/empty.svg'
import {
  EmptyContainer,
  EmptyTitle,
  EmptySubTitle,
  EmptyIllustration,
} from '_style'

// EMPTY LIST
/**
 * It returns a EmptyListContainer component with a EmptyTitle,
 * EmptyIllustration and EmptySubTitle component inside it.
 * @returns A component
 */
function EmptyList({ theme }) {
  return (
    <EmptyContainer theme={theme}>
      <EmptyTitle theme={theme}>Dommage...</EmptyTitle>
      <EmptyIllustration src={EmptyImage} />
      <EmptySubTitle theme={theme}>
        Pas de posts à afficher, merci d'en créer un!
      </EmptySubTitle>
    </EmptyContainer>
  )
}

export { EmptyList }

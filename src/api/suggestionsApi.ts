import axios from 'axios'

type Suggestion = {
  word: string
  score: number
  tags: string[]
}

export async function getTopSuggestions(keyword: string): Promise<Suggestion[]> {
  const res = await axios.get('https://api.datamuse.com/words?ml=' + keyword)
  return res.data
}

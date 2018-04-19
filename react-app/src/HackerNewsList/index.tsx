import * as React from 'react';
import { Story } from 'model';
import { model } from './model';

interface Props {}

interface State {
  searchText: string;
  newsList: Story[];
  loading: boolean;
}

class HackerNewsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: '',
      newsList: [],
      loading: false,
    };
  }

  componentWillMount() {
    const { searchText, newsList, loading } = model;
    
    searchText.subscribe(searchText => this.setState({ searchText }));
    newsList.subscribe(newsList => this.setState({ newsList }));
    loading.subscribe(loading => this.setState({ loading }));
  }

  handleInputChange: React.ReactEventHandler<HTMLInputElement> = ev => {
    const text = ev.currentTarget.value;
    model.changeSearchText(text);
  }

  public render() {
    const { searchText, newsList, loading } = this.state;
    return (
      <div>
        hacker news list
        <p>loading: {loading ? 'true' : 'false'}</p>
        <input value={searchText} onChange={this.handleInputChange} />
        <pre><code>{JSON.stringify(newsList.map(n => n.title), null, 2)}</code></pre>
        <pre><code>{JSON.stringify(newsList, null, 2)}</code></pre>
      </div>
    );
  }
}

export default HackerNewsList;

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

# Goals

This is a Flip Transaction Application that consist of two pages: Transaction List Page and Detail Page. Mockup for all pages is attached below.

1. Transaction List Page

it has list of transactions
it can be searched or filtered by
name,
sender bank,
beneficiary bank,
transaction's amount
it can be sorted by
name A-Z,
name Z-A,
date newest,
date oldest


2. Detail Page
App navigated to Detail Page when transaction row on Transaction List Page is pressed.

it has all informations about the selected transaction
it has a back button

Here are the steps that i've done to optimize the code

## Step 1: Debouncing handleSearch

We are using a debounced search function, and it could be optimized further by limiting re-renders during search. Since handleSearch is passed to the useDebounce hook, it can cause unnecessary re-renders of the component. I did memoizing the search handler with useCallback to avoid that.

```bash
  const handleSearch = useCallback(
    (text: string) => {
      const lowercasedText = text.toLowerCase();
      const filtered = data.filter(
        ({beneficiary_bank, sender_bank, beneficiary_name, amount}) =>
          beneficiary_bank.toLowerCase().includes(lowercasedText) ||
          sender_bank.toLowerCase().includes(lowercasedText) ||
          beneficiary_name.toLowerCase().includes(lowercasedText) ||
          amount.toString().includes(lowercasedText), // Convert amount to string temporarily
      );
      setFilteredData(filtered); // The original amount remains a number
    },
    [data],
  );

  // Debounced search handler
  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSearchTermChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };
```

Also here is the reusable hooks that was used for the debounce. I've added comments on each lines to explain how it works

```bash
import {useRef} from 'react';

// useDebounce hook takes in two parameters: the callback function and the delay time (in milliseconds)
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T, // The function to debounce
  delay: number, // The delay in milliseconds before executing the callback
): (...args: Parameters<T>) => void {
  // The hook returns a debounced version of the callback
  // useRef hook is used to keep a mutable reference to the timeout ID between renders
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // The returned function, which is debounced, accepts the same arguments as the original callback
  return (...args: Parameters<T>) => {
    // If there is an active timeout, clear it to reset the timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to invoke the callback after the specified delay
    timeoutRef.current = setTimeout(() => {
      // Call the original callback with the provided arguments after the delay
      callback(...args);
    }, delay); // The callback will be invoked after the 'delay' time has passed
  };
}
```



## Step 2: Avoiding Re-sorting on Every Render

Sorting the data every time sortData is called is a potential performance bottleneck, especially for large datasets. To optimize, i avoid sorting the data on each render by memoizing the sorted data using useMemo so it’s only recomputed when filteredData or selectedSortOption changes.

```bash
  // This is the data that we will be using for our flatlist
  const sortedData = useMemo(() => {
    let sorted = [...filteredData];
    switch (selectedSortOption) {
      case 'asc':
        sorted = sorted.sort((a, b) =>
          a.beneficiary_name.localeCompare(b.beneficiary_name),
        );
        break;
      case 'desc':
        sorted = sorted.sort((a, b) =>
          b.beneficiary_name.localeCompare(a.beneficiary_name),
        );
        break;
      case 'dateAsc':
        sorted = sorted.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      case 'dateDesc':
        sorted = sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredData, selectedSortOption]);

```

## Step 3: Optimizing FlatList
FlatList can be optimized by ensuring that it’s handling large datasets efficiently. Some optimizations include:

initialNumToRender: Set an appropriate value to control how many items to render initially.
maxToRenderPerBatch: Control how many items are rendered in each batch.

Because the data always returns 10 everytime it randomized, i set all to 10.

```bash
     <FlatList
        data={sortedData} // Use the sorted data for display
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id} // Using the key (transaction ID)
        renderItem={({item}) => (
          <TransactionCards data={item} onPress={() => onPressCard(item)} />
        )}
        contentContainerStyle={styles.contentStyle}
        refreshing={refreshing}
        onRefresh={onRefresh}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
```


## Notes
I was considering adding caching mechanisms like local storage (using AsyncStorage or other solutions) to avoid fetching the data every time the page is loaded. But since the data always changes everytime because it randomized, i decided it wasn't necessary.

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# My Contacts

- [LinkedIn](https://www.linkedin.com/in/evanssmiles/) - Get to know more about me
- [Gitlab](https://gitlab.com/evanssmiles) - My other projects

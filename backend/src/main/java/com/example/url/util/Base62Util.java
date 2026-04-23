package com.example.url.util;

public class Base62Util {

    private static final String BASE62 =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static String encode(long value) {
        StringBuilder sb = new StringBuilder();
        while (value > 0) {
            sb.append(BASE62.charAt((int) (value % 62)));
            value /= 62;
        }
        return sb.reverse().toString();
    }

    // reverse half logic
    public static String customHash(String base62) {
        int mid = base62.length() / 2;

        String firstHalf = base62.substring(0, mid);
        String secondHalf = base62.substring(mid);

        return new StringBuilder(secondHalf).reverse().toString()
                + new StringBuilder(firstHalf).reverse().toString();
    }
}

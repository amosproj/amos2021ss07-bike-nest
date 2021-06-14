package com.bikenest.common.helper;

import java.security.SecureRandom;
import java.util.Locale;
import java.util.Objects;
import java.util.Random;

public class RandomStringHelper {

    /**
     * Generate a random string.
     */
    public static String nextString(int length) {
        char[] symbols = alphanum.toCharArray();
        char[] result = new char[length];

        Random random = new SecureRandom();

        for (int idx = 0; idx < result.length; ++idx)
            result[idx] = symbols[random.nextInt(symbols.length)];
        return new String(result);
    }

    public static final String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static final String lower = upper.toLowerCase(Locale.ROOT);

    public static final String digits = "0123456789";

    public static final String alphanum = upper + lower + digits;
}
